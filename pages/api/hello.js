// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';
import * as cheerio from 'cheerio';
import { element } from 'prop-types';

export default async function handler(req, res) {

  const achievements = await scrape(req.query.id)
  const contributions = `https://ghchart.rshah.org/${req.query.id}`

  res.status(200).json({ achievements, contributions })
}

async function scrape(id) {
  const url = `https://github.com/${id}?tab=achievements`
  // ? Get HTML of the website
  const response = await axios.get(url)
  const html = response.data

  // ? Load HTML to cheerio
  const $ = cheerio.load(html)

  const productData = $('details.js-achievement-card-details').map((_, element) => {
    const productElement = $(element)
    const title = productElement.find('h3').text()
    const cover = productElement.find('img.achievement-badge-card').prop('src')
    const number = productElement.find('span.achievement-tier-label').text()

    return {
      title,
      number_at_achievement: number,
      cover: `${cover}`,
    }
  }).get()

  return productData
}
