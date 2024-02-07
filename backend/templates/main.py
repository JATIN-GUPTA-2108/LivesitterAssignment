from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId
from pymongo.errors import InvalidId

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['overlay_settings_db']
collection = db['overlay_settings']

# Error messages
NOT_FOUND_ERROR_MSG = "Overlay setting not found"
INVALID_ID_ERROR_MSG = "Invalid setting ID"


# Create operation: Add a new overlay setting
@app.route('/overlay_settings', methods=['POST'])
def create_overlay_setting():
    data = request.json
    inserted_id = collection.insert_one(data).inserted_id
    return jsonify({'message': 'Overlay setting created successfully', '_id': str(inserted_id)}), 201


# Read operation: Retrieve all overlay settings
@app.route('/overlay_settings', methods=['GET'])
def get_overlay_settings():
    # Retrieve all overlay settings from the database
    overlay_settings = list(collection.find())
    # Convert ObjectId to string for each setting
    for setting in overlay_settings:
        setting['_id'] = str(setting['_id'])
    return jsonify(overlay_settings)


# Update operation: Modify an existing overlay setting
@app.route('/overlay_settings/<string:setting_id>', methods=['PUT'])
def update_overlay_setting(setting_id):
    data = request.json
    try:
        # Update the overlay setting in the database
        result = collection.update_one({'_id': ObjectId(setting_id)}, {'$set': data})
        # Check if the setting was found and updated
        if result.modified_count:
            return jsonify({'message': 'Overlay setting updated successfully'})
        else:
            # Return error message if the setting was not found
            return jsonify({'error': NOT_FOUND_ERROR_MSG}), 404
    except InvalidId:
        # Return error message if the provided ID is invalid
        return jsonify({'error': INVALID_ID_ERROR_MSG}), 400


# Delete operation: Delete an existing overlay setting
@app.route('/overlay_settings/<string:setting_id>', methods=['DELETE'])
def delete_overlay_setting(setting_id):
    try:
        # Delete the overlay setting from the database
        result = collection.delete_one({'_id': ObjectId(setting_id)})
        # Check if the setting was found and deleted
        if result.deleted_count:
            return jsonify({'message': 'Overlay setting deleted successfully'})
        else:
            # Return error message if the setting was not found
            return jsonify({'error': NOT_FOUND_ERROR_MSG}), 404
    except InvalidId:
        # Return error message if the provided ID is invalid
        return jsonify({'error': INVALID_ID_ERROR_MSG}), 400


if __name__ == '__main__':
    app.run(debug=True)
