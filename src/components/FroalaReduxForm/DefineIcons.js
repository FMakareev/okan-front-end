import $ from 'jquery';
import Froalaeditor from 'froala-editor';
import copyIcon from '../../assets/image/copyIcon.png';
import bindIcon from '../../assets/image/bindIcon.png';
import deleteIcon from '../../assets/image/deleteIcon.png';

export function DefineIcons(props) {
  Froalaeditor.DefineIcon('copy', {
    SRC: copyIcon,
    ALT: 'Copy',
    template: 'image',
  });
  Froalaeditor.RegisterCommand('copy', {
    title: 'Copy block',
    focus: true,
    undo: false,
  });

  Froalaeditor.DefineIcon('bind', { SRC: bindIcon, ALT: 'Bind', template: 'image' });
  Froalaeditor.RegisterCommand('bind', {
    title: 'Bind block',
    focus: true,
    undo: false,
  });

  Froalaeditor.DefineIcon('unbind', { SRC: deleteIcon, ALT: 'unbind', template: 'image' });
  Froalaeditor.RegisterCommand('unbind', {
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
