"use strict";

var App = (
    function() {
        /////////////////
        //Private Vars //
        /////////////////
        var __editor = null
            ,__aceLangTools;

        ////////////////////
        //Ace Initializer //
        ////////////////////
        var __initAce = function() {
            //Lang Tools
            __aceLangTools = ace.require( "ace/ext/language_tools" );

            //Init editor
            __editor = ace.edit( "formula-editor" );

            //Setting language
            __editor.session.setMode( "ace/mode/sfformula" );

            //Configure various options
            __editor.setOptions(
                {
                    enableBasicAutocompletion   : true,
                    enableLiveAutocompletion    : true,
                    showInvisibles              : true
                }
            );

            //Set font size
            __editor.setFontSize( 16 );

            //Set theme
            __editor.setTheme( "ace/theme/monokai" );
        };

        //////////////////
        //Init Slideout //
        //////////////////
        var __initSlideout = function() {
            var slideout = new Slideout(
                {
                    "panel"     : jQuery( "#panel" )[0],
                    "menu"      : jQuery( "#menu" )[0],
                    "padding"   : 256,
                    "tolerance" : 70
                }
            );

            jQuery( "#menu" ).show();

            jQuery( ".sidebar-menu-toggle" ).click(
                function() {
                    slideout.toggle();
                }
            );
        };

        ////////////////
        //Initializer //
        ////////////////
        var __init = function() {
            __initSlideout();

            __initAce();
        };

        __init();
    }
)();