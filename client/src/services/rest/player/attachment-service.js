// import client from '../client';
import IAttachment from '../../interfaces/IAttachment';
import implement from 'implement-js';

const attachment = {
    getAttachments: () => {},
    getAttachment: () => {},
    createAttachment: () => {},
    updateAttachment: () => {},
    deleteAttachment: () => {}
};

implement(IAttachment)(attachment);

export default attachment;