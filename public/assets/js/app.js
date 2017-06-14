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
        
        /**
         * The settings are saved in the
         * Local Storage. This method reads
         * the Local Storage and fetches any
         * previously stored settings.
         */
        var __getSettings = function() {
            var settings = {};

            if( localStorage.settings ) {
                settings = JSON.parse( localStorage.settings );
            }

            return settings;
        };

        /**
         * Saves the passed in "settings"
         * into the Local Storage. If
         * there is any previously
         * stored settings then values
         * are replaced.
         *
         * @param   newSettings     New Settings saved by the
         *                          User via the Settings Modal.
         */
        var __setSettings = function( newSettings ) {
            var existingSettings = __getSettings();

            for( var key in newSettings ) {
                existingSettings[key] = newSettings[key];
            }

            localStorage.settings = JSON.stringify( existingSettings );
        };

        /**
         * Generating the Default Settings
         * that needs to be used when the
         * editor is opened for the first
         * time.
         */
        var __createDefaultSettings = function() {
            var defSettings = __getSettings();

            if( Object.keys( defSettings ).length === 0 ) {
                defSettings = Constants.ACE_DEF_SETTINGS;

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

            /**
             * Read the stored settings from the
             * Local Storage and set the Input Fields
             * in the "Settings" Modal to values
             * that were read.
             */
            jQuery( "[data-settings]" ).each(
                function() {
                    var key = jQuery( this ).data( "settings" );

                    jQuery( this ).val( settings[key] );
                }
            );
        };

        /**
         * Capture all the new settings selected
         * by the User and save it to the Local
         * Storage.
         */
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
                    panel     : jQuery( "#panel" )[0],
                    menu      : jQuery( "#menu" )[0],
                    padding   : 256,
                    tolerance : 70
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