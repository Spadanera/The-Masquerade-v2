import { Interface, type } from 'implement-js';

const Attachment = Interface('Story')({
    getAttachments: type('function'),
    getAttachment: type('function'),
    createAttachment: type('function'),
    updateAttachment: type('function'),
    deleteAttachment: type('function')
}, {
    error: true,
    strict: true 
});

export default Attachment;