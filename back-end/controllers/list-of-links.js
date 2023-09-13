const getLinksController = async (req, res, next) => {
  try {
    const listOfLinks = await getAllLinks();

    res.send({
      status: 'ok',
      data: listOfLinks,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLinksController
};
