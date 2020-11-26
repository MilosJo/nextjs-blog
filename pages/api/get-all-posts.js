import { getAllPostIds } from '../../lib/posts'

export default async function (req, res) {
  const posts = await getAllPostIds();

  res.json({
    posts,
  });
};