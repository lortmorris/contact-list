
const hooks = (upInstance) => {
  upInstance.addHook('/comments', 'afterInsert', async (req, inserted) => {
    await createFeedItem(inserted.users, 'comment', { comment: inserted.comment, cars: inserted.cars });
    return Promise.resolve(inserted);
  });
};

module.exports = hooks;
