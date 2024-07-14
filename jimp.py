from flask import Flask, request, jsonify
from PIL import Image
from io import BytesIO

app = Flask(__name__)


products = []


@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)


@app.route('/products', methods=['POST'])
def add_product():
    try:
        data = request.get_json()
        name = data['name']
        price = data['price']
        image_url = data['image_url']

         using Pillow
        image = Image.open(BytesIO(image_url))
        image.thumbnail((200, 200))  # Resize the image
        image_buffer = BytesIO()
        image.save(image_buffer, format="JPEG")

        product = {
            'name': name,
            'price': price,
            'image_url': image_buffer.getvalue(),
        }

        products.append(product)

        return jsonify(product), 201

    except Exception as e:
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
