import $ from 'jquery';

import copyIcon from '../../assets/image/copyIcon.png';
import bindIcon from '../../assets/image/bindIcon.png';
import deleteIcon from '../../assets/image/deleteIcon.png';

export function DefineIcons() {
    $.FroalaEditor.DefineIcon('copy', {SRC: copyIcon, ALT: 'Copy', template: 'image'});
    $.FroalaEditor.RegisterCommand('copy', {
        title: 'copy something',
        focus: true,
        undo: false,
        refreshAfterCallback: false,
        callback: () => {
            alert('Copied!')
        },
    });

    $.FroalaEditor.DefineIcon('bind', {SRC: bindIcon, ALT: 'Bind', template: 'image'});
    $.FroalaEditor.RegisterCommand('bind', {
        title: 'bind something',
        focus: true,
        undo: false,
        refreshAfterCallback: false,
        callback: () => {
            alert('Binded!')
        },
        hover: () => {
            alert('hovered')
        }
    });

    $.FroalaEditor.DefineIcon('delete', {SRC: deleteIcon, ALT: 'Delete', template: 'image'});
    $.FroalaEditor.RegisterCommand('delete', {
        title: 'delete something',
        focus: true,
        undo: false,
        refreshAfterCallback: false,
        callback: () => {
            alert('Deleted!')
        },
    });
}