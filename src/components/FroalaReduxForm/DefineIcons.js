import $ from 'jquery';

import copyIcon from '../../assets/image/copyIcon.png';
import bindIcon from '../../assets/image/bindIcon.png';
import deleteIcon from '../../assets/image/deleteIcon.png';
// import './NameInputPlugin';

export function DefineIcons(props) {
  $.FroalaEditor.DefineIcon('copy', {
    SRC: copyIcon,
    ALT: 'Copy',
    template: 'image',
  });
  $.FroalaEditor.RegisterCommand('copy', {
    title: 'copy something',
    focus: true,
    undo: false,
    refreshAfterCallback: false,
    callback: command => {
      props.buttonClick(command);
    },
  });

  $.FroalaEditor.DefineIcon('bind', { SRC: bindIcon, ALT: 'Bind', template: 'image' });
  $.FroalaEditor.RegisterCommand('bind', {
    title: 'Bind block',
    focus: true,
    undo: false,
    refreshAfterCallback: true,
    callback: command => {
      props.buttonClick(command);
    },
  });

  $.FroalaEditor.DefineIcon('unbind', { SRC: deleteIcon, ALT: 'unbind', template: 'image' });
  $.FroalaEditor.RegisterCommand('unbind', {
    title: 'Unbind block',
    focus: true,
    undo: false,
    refreshAfterCallback: false,
    callback: command => {
      props.buttonClick(command);
    },
  });

  // var publicMethod = require('./NameInputPlugin');

  // Add an option for your plugin.
  // $.FroalaEditor.DEFAULTS = $.extend($.FroalaEditor.DEFAULTS, {
  //   myOption: false
  // });

  // // Define the plugin.
  // // The editor parameter is the current instance.
  // $.FroalaEditor.PLUGINS.myPlugin = function (editor) {
  //   // Private variable visible only inside the plugin scope.
  //   var private_var = 'My awesome plugin';

  //   // Private method that is visible only inside plugin scope.
  //   function _privateMethod () {
  //     console.log (private_var);
  //   }

  //   // Public method that is visible in the instance scope.
  //   function publicMethod () {
  //     console.log (_privateMethod());
  //   }

  //   // The start point for your plugin.
  //   function _init () {
  //     // You can access any option from documentation or your custom options.
  //     console.log(typeof editor)
  //     editor.append('Some test text');

  //     // Call any method from documentation.
  //     // editor.methodName(params);

  //     // You can listen to any event from documentation.
  //     // editor.events.add('contentChanged', function (params) {});
  //   }

  //   // Expose public methods. If _init is not public then the plugin won't be initialized.
  //   // Public method can be accessed through the editor API:
  //   // $('.selector').froalaEditor('myPlugin.publicMethod');
  //   return {
  //     _init: _init,
  //     publicMethod: publicMethod
  //   }
  // }

  return null;
}
