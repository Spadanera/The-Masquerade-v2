import client from '../../client';
import IAttachment from '../../interfaces/IAttachment';
import implement from 'implement-js';

const attachment = {
    getAttachments: async (chronicleId) => {
        let response = await client.get(
            `/api/attachments/chronicle/${chronicleId}`
        );
        return response.data;
    },
    getAttachment: () => {},
    createAttachment: () => {},
    updateAttachment: () => {},
    deleteAttachment: () => {}
};

implement(IAttachment)(attachment);

export default attachment;