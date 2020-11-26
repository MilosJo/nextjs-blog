import { getPostData } from '../../lib/posts'


export default async function (req, res) {
  const post = await getPostData(req.query.id);

  res.json({
    post,
  });
};