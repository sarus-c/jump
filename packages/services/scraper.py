from bs4 import BeautifulSoup
import requests


def scrap(url):
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'lxml')
    prices = soup.findAll('div', class_='card-section-wrapper js-section-wrapper', limit=3)
    items = []

    for index, price in enumerate(prices):
        try:
            img = price.find('div', class_='thumbnail').find('img').get('src')
            title_a = price.find('a', class_='product-title js-product-url')
            title = title_a.text.replace('\n', '')
            url = title_a.get('href')
            price_p = price.find('p', class_='product-new-price').contents
            price = price_p[0] + "," + price_p[1].string + " " + price_p[3].string
            item = {
                'title': title.strip(),
                'url': url,
                'img': img,
                'price': price
            }

            items.append(item)

        except IndexError:
            pass

    return items
