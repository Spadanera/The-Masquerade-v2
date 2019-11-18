import client from '../client';
import IAttachment from '../interfaces/IAttachment';
import implement from 'implement-js';

const attachment = {
    getAttachments: async (chronicleId) => {
        let response = await client.get(
            `/api/attachments/chronicle/${chronicleId}`
        );
        return response.data;
    },
    getAttachment: () => {},
    createAttachment: async (chronicleId, attachment) => {
        attachment.chronicleId = chronicleId;
        await client.post(`/api/attachments/${chronicleId}`, attachment);
    },
    updateAttachment: async (attachmentId, attachment) => {
        await client.put(`/api/attachments/${attachmentId}`, attachment);
    },
    deleteAttachment: async (attachmentId) => {
        await client.delete(`/api/attachments/${attachmentId}`);
    }
};

implement(IAttachment)(attachment);

export default attachment;