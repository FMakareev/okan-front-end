import $ from 'jquery';

import copyIcon from '../../assets/image/copyIcon.png';
import bindIcon from '../../assets/image/bindIcon.png';
import deleteIcon from '../../assets/image/deleteIcon.png';

export function DefineIcons(props) {
  $.FroalaEditor.DefineIcon('copy', {
    SRC: copyIcon,
    ALT: 'Copy',
    template: 'image',
  });
  $.FroalaEditor.RegisterCommand('copy', {
    title: 'Copy block',
    focus: true,
    undo: false,
  });

  $.FroalaEditor.DefineIcon('bind', { SRC: bindIcon, ALT: 'Bind', template: 'image' });
  $.FroalaEditor.RegisterCommand('bind', {
    title: 'Bind block',
    focus: true,
    undo: false,
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

  return null;
}
