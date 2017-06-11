/**
 * Mode for Salesforce Formula
 */
define(
    "ace/mode/sfformula",
    [],
    function( require, exports, module ) {
        var oop                     = require( "ace/lib/oop" );
        var TextMode                = require( "ace/mode/text" ).Mode;
        var Tokenizer               = require( "ace/tokenizer" ).Tokenizer;
        var SFFormulaHighlightRules = require( "ace/mode/sfformula_highlight_rules" ).SFFormulaHighlightRules;

        var Mode = function() {
            this.HighlightRules = SFFormulaHighlightRules;
        };

        oop.inherits( Mode, TextMode );

        ( function() {
        } ).call( Mode.prototype );

        exports.Mode = Mode;
    }
);

/**
 * Highlight Rules for Salesforce
 * Formulas
 */
define(
    "ace/mode/sfformula_highlight_rules",
    [],
    function( require, exports, module ) {
        var oop                  = require( "ace/lib/oop" );
        var TextHighlightRules   = require( "ace/mode/text_highlight_rules" ).TextHighlightRules;

        var SFFormulaHighlightRules = function() {
            this.$rules = {
                "start" : [
                    {
                        token : "comment",
                        regex : "\\/\\*(.*?)",
                        next  : "comment"
                    },
                    {
                        token : "constant.language",
                        regex : "null|NULL|true|TRUE|false|FALSE"
                    },
                    {
                        token : "constant.numeric",
                        regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
                    },
                    {
                        token : "punctuation.operator",
                        regex : "\\,|\\(|\\)"
                    },
                    {
                        token : "keyword.operator",
                        regex : "!|%|&|\\^|\/|\\*|\\-|\\+|==|=|!=|<=|>=|<>|<|>|!|&&|\\|\\|"
                    },
                    {
                        token : "support.function",
                        regex : //Date and Time Functions
                                "date|datevalue|datetimevalue|day|month|now|today|year|DATE|DATEVALUE|DATETIMEVALUE|DAY|MONTH|NOW|TODAY|YEAR|" +
                                //Logical Functions
                                "and|blankvalue|case|if|isblank|isclone|isnew|isnull|isnumber|not|nullvalue|or|priorvalue|AND|BLANKVALUE|CASE|IF|ISBLANK|ISCLONE|ISNEW|ISNULL|ISNUMBER|NOT|NULLVALUE|OR|PRIORVALUE|" +
                                //Math Functions
                                "abs|ceiling|distance|exp|floor|geolocation|ln|log|max|min|mod|round|sqrt|ABS|CEILING|DISTANCE|EXP|FLOOR|GEOLOCATION|LN|LOG|MAX|MIN|MOD|ROUND|SQRT|" +
                                //Text Functions
                                "begins|br|casesafeid|contains|find|getsessionid|htmlencode|hyperlink|image|includes|ispickval|jsencode|jsinhtmlencode|left|len|lower|lpad|mid|right|rpad|substitute|text|trim|upper|urlencode|value|BEGINS|BR|CASESAFEID|CONTAINS|FIND|GETSESSIONID|HTMLENCODE|HYPERLINK|IMAGE|INCLUDES|ISPICKVAL|JSENCODE|JSINHTMLENCODE|LEFT|LEN|LOWER|LPAD|MID|RIGHT|RPAD|SUBSTITUTE|TEXT|TRIM|UPPER|URLENCODE|VALUE|" +
                                //Summary Functions
                                "parentgroupval|prevgroupval|PARENTGROUPVAL|PREVGROUPVAL|" +
                                //Advanced Functions
                                "getrecordids|include|ischanged|linkto|regex|requirescript|urlfor|vlookup|GETRECORDIDS|INCLUDE|ISCHANGED|LINKTO|REGEX|REQUIRESCRIPT|URLFOR|VLOOKUP"
                    },
                    {
                        token : "identifier",
                        regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                    },
                    {
                        token : "string",
                        regex : '".*?"'
                    },
                    {
                        token : "string",
                        regex : "'.*?'"
                    }
                ],
                "comment" : [
                    {
                        token : "comment",
                        regex : ".*?\\*\\/",
                        next  : "start"
                    },
                    {
                        token : "comment",
                        regex : ".+"
                    }
                ]
            };
            
            this.normalizeRules();
        };

        oop.inherits( SFFormulaHighlightRules, TextHighlightRules );

        exports.SFFormulaHighlightRules = SFFormulaHighlightRules;
    }
);