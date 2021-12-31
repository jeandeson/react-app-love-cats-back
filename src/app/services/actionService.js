import ActionRepository from "../repository/actionRepository.js";

const actionRepository = new ActionRepository();
class ActionService {
  async follow(body) {
    const result = await actionRepository.follow(body);
    if (result[0].affectedRows > 0) {
      const { insertId } = [...result].shift();
      body.id = insertId;
      return body;
    }
    return -1;
  }

  async comment(body) {
    const result = await actionRepository.comment(body);
    if (result[0].affectedRows > 0) {
      const { insertId } = [...result].shift();
      body.id = insertId;
      return body;
    }
    return -1;
  }

  async verifyFollow(body) {
    const result = await actionRepository.verifyFollow(body);
    if (result[0]) {
      return result;
    }
    return -1;
  }

  async getTotalFollows(id) {
    const result = await actionRepository.getTotalFollows(id);
    if (result[0]) {
      return result;
    }
    return -1;
  }

  async unFollow(body) {
    const result = await actionRepository.unFollow(body);
    if (result[0].affectedRows > 0) {
      return result;
    }
    return -1;
  }
}

export default ActionService;
