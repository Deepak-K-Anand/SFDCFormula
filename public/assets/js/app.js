"use strict";

var App = (
    function() {
        /////////////////
        //Private Vars //
        /////////////////
        var __editor = null
            ,__aceLangTools;

        ///////////////////////
        //Settings Functions //
        ///////////////////////
        var __getSettings = function() {
            var settings = {};

            if( localStorage.settings ) {
                settings = JSON.parse( localStorage.settings );
            }

            return settings;
        };

        var __setSettings = function( newSettings ) {
            var existingSettings = __getSettings();

            for( var key in newSettings ) {
                existingSettings[key] = newSettings[key];
            }

            localStorage.settings = JSON.stringify( existingSettings );
        };

        var __createDefaultSettings = function() {
            var defSettings = __getSettings();

            if( Object.keys( defSettings ).length === 0 ) {
                defSettings = {
                    mode        : "ace/mode/sfformula",
                    theme       : "ace/theme/monokai",
                    fontSize    : "16"
                };

                __setSettings( defSettings );
            }
        };

        var __loadEditorSettings = function() {
            var settings = __getSettings();

            //Setting language
            __editor.session.setMode( settings.mode );

            //Set theme
            __editor.setTheme( settings.theme );

            //Set font size
            __editor.setFontSize( parseInt( settings.fontSize ) );

            jQuery( "[data-settings]" ).each(
                function() {
                    var key = jQuery( this ).data( "settings" );

                    jQuery( this ).val( settings[key] );
                }
            );
        };

        var __saveEditorSettings = function() {
            var newSettings = {}; 

            jQuery( "[data-settings]" ).each(
                function() {
                    newSettings[ jQuery( this ).data( "settings" ) ] = jQuery( this ).val();
                }
            );

            __setSettings( newSettings );
        };

        ////////////////////
        //Ace Initializer //
        ////////////////////
        var __initAce = function() {
            __createDefaultSettings();

            //Lang Tools
            __aceLangTools = ace.require( "ace/ext/language_tools" );

            //Init editor
            __editor = ace.edit( "formula-editor" );

            //Configure various options
            __editor.setOptions(
                {
                    enableBasicAutocompletion   : true,
                    enableLiveAutocompletion    : true,
                    showInvisibles              : true
                }
            );

            __loadEditorSettings();
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

        return {
            loadEditorSettings : function() {
                __loadEditorSettings();
            },
            saveEditorSettings : function() {
                __saveEditorSettings();

                __loadEditorSettings();

                jQuery( "#mdlSettings" ).modal( "hide" );
            }
        }
    }
)();