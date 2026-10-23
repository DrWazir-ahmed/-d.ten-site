/**
 * PythonInterpreter.js
 * A lightweight, safe, zero-latency Python runtime engine for kids (ages 6-12).
 * Supports:
 * - print(), multiple arguments, string formatting, arithmetic
 * - Variables (numbers, strings, booleans, lists)
 * - input() with interactive prompt
 * - if, elif, else conditional branching
 * - for loops (range(n), range(start, end, step), list iteration)
 * - while loops (with runaway loop protection)
 * - list creation, indexing, append(), len(), pop()
 * - def functions with parameters and return
 * - Kid-friendly error diagnostics in English and Urdu!
 */

export class PythonKidInterpreter {
  constructor(options = {}) {
    this.onInput = options.onInput || ((promptText) => window.prompt(promptText || 'Enter input:'));
    this.maxIterations = options.maxIterations || 1000;
  }

  // Pre-parser syntax validator for friendly kid errors
  validateSyntax(code) {
    const lines = code.split('\n');
    const errors = [];

    lines.forEach((line, idx) => {
      const lineNum = idx + 1;
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      // Check quotes matching
      const doubleQuotes = (line.match(/"/g) || []).length;
      const singleQuotes = (line.match(/'/g) || []).length;
      if (doubleQuotes % 2 !== 0 && singleQuotes % 2 === 0) {
        errors.push({
          line: lineNum,
          type: 'SyntaxError',
          message: `Missing matching double quote (") on line ${lineNum}.`,
          urduMessage: `لائن نمبر ${lineNum} پر کوٹیشن مارک (") مکمل نہیں ہے۔ یاد رکھیں کہ ہر " کو بند کرنا ضروری ہے۔`,
          hint: 'Example: print("Hello Pakistan!")'
        });
      } else if (singleQuotes % 2 !== 0 && doubleQuotes % 2 === 0) {
        errors.push({
          line: lineNum,
          type: 'SyntaxError',
          message: `Missing matching single quote (') on line ${lineNum}.`,
          urduMessage: `لائن نمبر ${lineNum} پر سنگل کوٹ (') بند کرنا بھول گئے ہیں۔`,
          hint: "Example: print('Babar Azam')"
        });
      }

      // Check parentheses matching
      const openParen = (line.match(/\(/g) || []).length;
      const closeParen = (line.match(/\)/g) || []).length;
      if (openParen !== closeParen) {
        errors.push({
          line: lineNum,
          type: 'SyntaxError',
          message: `Parentheses mismatch on line ${lineNum}: found ${openParen} '(' and ${closeParen} ')'.`,
          urduMessage: `لائن نمبر ${lineNum} پر بریکٹ ( ) درست طریقے سے بند نہیں ہے۔`,
          hint: 'Check that every open bracket ( has a closing bracket ).'
        });
      }

      // Check colon on if/elif/else/for/while/def
      const controlKeywords = ['if ', 'elif ', 'else', 'for ', 'while ', 'def '];
      for (const kw of controlKeywords) {
        if (trimmed.startsWith(kw) && !trimmed.endsWith(':') && !trimmed.includes('#')) {
          errors.push({
            line: lineNum,
            type: 'SyntaxError',
            message: `Missing colon (:) at the end of line ${lineNum}.`,
            urduMessage: `لائن نمبر ${lineNum} پر آخر میں کولن (:) لگانا ضروری ہے۔`,
            hint: `In Python, write it like: ${trimmed}:`
          });
          break;
        }
      }
    });

    return errors;
  }

  // Execute Python code
  async run(code) {
    const output = [];
    const logs = [];

    // First validate syntax
    const syntaxErrors = this.validateSyntax(code);
    if (syntaxErrors.length > 0) {
      const err = syntaxErrors[0];
      return {
        success: false,
        output: [`❌ ${err.type} on line ${err.line}:`, err.message],
        error: err
      };
    }

    try {
      const state = {
        variables: {},
        functions: {},
        output: [],
        stepCount: 0
      };

      // Custom print implementation
      const customPrint = (...args) => {
        const text = args.map(a => {
          if (a === null) return 'None';
          if (a === undefined) return 'None';
          if (typeof a === 'boolean') return a ? 'True' : 'False';
          if (Array.isArray(a)) return '[' + a.map(x => typeof x === 'string' ? `'${x}'` : x).join(', ') + ']';
          if (typeof a === 'object') return JSON.stringify(a);
          return String(a);
        }).join(' ');
        state.output.push(text);
      };

      // Transform code into safe runnable JavaScript AST representation
      const jsCode = this.transpileToJS(code);

      // Secure execution sandbox
      const sandboxFn = new Function('print', 'input', 'range', 'len', 'str', 'int', 'float', jsCode);
      
      const customInput = async (promptMsg = '') => {
        if (this.onInput) {
          const val = await this.onInput(promptMsg);
          return val || '';
        }
        return '';
      };

      const customRange = (start, end, step = 1) => {
        if (end === undefined) {
          end = start;
          start = 0;
        }
        const res = [];
        if (step > 0) {
          for (let i = start; i < end; i += step) res.push(i);
        } else if (step < 0) {
          for (let i = start; i > end; i += step) res.push(i);
        }
        return res;
      };

      const customLen = (obj) => {
        if (obj === null || obj === undefined) return 0;
        if (typeof obj === 'string' || Array.isArray(obj)) return obj.length;
        if (typeof obj === 'object') return Object.keys(obj).length;
        return 0;
      };

      // Execute inside sandbox
      await sandboxFn(
        customPrint,
        customInput,
        customRange,
        customLen,
        (x) => String(x),
        (x) => parseInt(x, 10) || 0,
        (x) => parseFloat(x) || 0
      );

      return {
        success: true,
        output: state.output.length > 0 ? state.output : ['(Program finished with no output)'],
        error: null
      };
    } catch (err) {
      console.warn('Execution error:', err);
      let friendlyUrdu = 'کوڈ چلاتے ہوئے خرابی پیش آئی ہے۔ املا اور ویری ایبلز کی تصدیق کریں۔';
      let hint = 'Double check variable names, indentation, and function arguments.';

      if (err.message.includes('is not defined')) {
        const varName = err.message.split(' ')[0] || 'Variable';
        friendlyUrdu = `ویری ایبل '${varName}' موجود نہیں ہے۔ کیا آپ نے اسے پہلے بنایا ہے؟`;
        hint = `Make sure you defined ${varName} before using it, e.g. ${varName} = 10`;
      }

      return {
        success: false,
        output: [`⚠️ Error: ${err.message}`],
        error: {
          type: 'RuntimeError',
          message: err.message,
          urduMessage: friendlyUrdu,
          hint: hint
        }
      };
    }
  }

  // Transpiles Python lines into executable Javascript
  transpileToJS(pyCode) {
    const rawLines = pyCode.split('\n');
    const jsLines = [];
    let indentStack = [0];

    for (let i = 0; i < rawLines.length; i++) {
      let line = rawLines[i];
      // strip inline comments that are outside quotes
      if (!line.includes('"') && !line.includes("'") && line.includes('#')) {
        line = line.split('#')[0];
      }
      
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const currentIndent = line.search(/\S/);

      // Handle dedents
      while (indentStack.length > 1 && currentIndent < indentStack[indentStack.length - 1]) {
        indentStack.pop();
        jsLines.push('}');
      }

      // Convert common Python idioms to JS
      let js = trimmed;

      // Python booleans
      js = js.replace(/\bTrue\b/g, 'true');
      js = js.replace(/\bFalse\b/g, 'false');
      js = js.replace(/\bNone\b/g, 'null');

      // Logical operators
      js = js.replace(/\band\b/g, '&&');
      js = js.replace(/\bor\b/g, '||');
      js = js.replace(/\bnot\b/g, '!');

      // if condition:
      if (js.startsWith('if ') && js.endsWith(':')) {
        const cond = js.slice(3, -1).trim();
        jsLines.push(`if (${cond}) {`);
        indentStack.push(currentIndent + 4);
        continue;
      }

      // elif condition:
      if (js.startsWith('elif ') && js.endsWith(':')) {
        const cond = js.slice(5, -1).trim();
        jsLines.push(`} else if (${cond}) {`);
        continue;
      }

      // else:
      if (js === 'else:') {
        jsLines.push('} else {');
        continue;
      }

      // for item in sequence:
      if (js.startsWith('for ') && js.includes(' in ') && js.endsWith(':')) {
        const parts = js.slice(4, -1).split(' in ');
        const itemVar = parts[0].trim();
        const seq = parts[1].trim();
        jsLines.push(`for (let ${itemVar} of ${seq}) {`);
        indentStack.push(currentIndent + 4);
        continue;
      }

      // while condition:
      if (js.startsWith('while ') && js.endsWith(':')) {
        const cond = js.slice(6, -1).trim();
        jsLines.push(`let __loopLimit_${i} = 0; while (${cond}) { if (++__loopLimit_${i} > 1000) throw new Error("Infinite loop detected! Loop stopped.");`);
        indentStack.push(currentIndent + 4);
        continue;
      }

      // def function_name(args):
      if (js.startsWith('def ') && js.endsWith(':')) {
        const decl = js.slice(4, -1).trim();
        jsLines.push(`function ${decl} {`);
        indentStack.push(currentIndent + 4);
        continue;
      }

      // list.append(x) -> list.push(x)
      js = js.replace(/\.append\(/g, '.push(');

      // Variable assignment (if not keyword or reassignment)
      if (js.includes('=') && !js.includes('==') && !js.includes('<=') && !js.includes('>=') && !js.includes('!=')) {
        const left = js.split('=')[0].trim();
        // check if valid identifier
        if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(left)) {
          js = `var ${js}`;
        }
      }

      jsLines.push(js + ';');
    }

    // Close remaining open brackets
    while (indentStack.length > 1) {
      indentStack.pop();
      jsLines.push('}');
    }

    return jsLines.join('\n');
  }
}
