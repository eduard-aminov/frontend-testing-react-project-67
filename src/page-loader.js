import axios from 'axios';
import fs from 'fs/promises';

const buildFilepath = (href, outputPath) => {
  const url = new URL(href);
  const hrefWithoutProtocol = url.hostname + url.pathname;

  const dirname = `${outputPath}/`;
  const filename = hrefWithoutProtocol.replace(/[^a-zA-Z0-9]/g, '-');
  const extension = '.html';
  return `${dirname}${filename}${extension}`;
};

export default async (href, outputPath) => {
  const response = await axios.get(href);
  const filepath = buildFilepath(href, outputPath);

  await fs.writeFile(filepath, response.data);

  return { filepath };
};
