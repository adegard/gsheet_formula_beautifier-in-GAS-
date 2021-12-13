//GSHEET formula beautifier:
//from https://itectec.com/webapp/google-sheets-pretty-print-google-sheet-formula/

function test(){
  var cell = SpreadsheetApp.getCurrentCell();
  var formula = cell.getFormula();
  formula = formula.replace(/\s+/g, ""); 
  cell.offset(0,1).setFormula(prettify(formula));
}

function prettify(formula){
  var pretty = '';
  var tabNum = 1;
  var tabOffset = 4;
  var tabs = [];
  formula.split('').forEach(function(c,i){
    if(/[\{\(]/.test(c)){
       tabNum++;
      tabs[tabNum] = (tabs[tabNum - 1] ? tabs[tabNum - 1] : 0) + tabOffset + 1;
      //tabOffset = 0;
      pretty += c + '\n' + ' '.repeat(tabs[tabNum]);
    } else if(/[\}\)]/.test(c)){
      tabNum--;
      pretty += c + '\n' + ' '.repeat(tabs[tabNum]);
      //tabOffset = 0;
    } else if (/[,;]/.test(c)) { 

     pretty += c + '\n' + ' '.repeat(tabs[tabNum]);
      //tabOffset = 0;
    } else {
      pretty += c;
      //tabOffset++;
    }
  });
  return pretty;
}