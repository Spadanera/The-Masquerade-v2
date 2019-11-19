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
    getAttachment: () => { },
    createAttachment: async (chronicleId, attachment) => {
        attachment.chronicleId = chronicleId;
        let file = attachment.file;
        delete attachment.file;
        let response = await client.post(`/api/attachments/${chronicleId}`, attachment);
        await saveAttachmentFile(response.data._id, file, true);
    },
    updateAttachment: async (attachmentId, attachment) => {
        delete attachment.file;
        await client.put(`/api/attachments/${attachmentId}`, attachment);
    },
    deleteAttachment: async (attachmentId) => {
        await client.delete(`/api/attachments/${attachmentId}`);
    }
};

async function saveAttachmentFile(attachmentId, file, toDelete) {
    let formData = new FormData();
    formData.append('file', file);
    try {
        await client.post(`/api/attachments/file/${attachmentId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        if (toDelete) {
            await client.delete(`/api/attachments/${attachmentId}`);
        }
        throw error;
    }
}

implement(IAttachment)(attachment);

export default attachment;