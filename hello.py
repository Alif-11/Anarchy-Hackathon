import os
from flask import Flask, render_template, flash, request, redirect, url_for, jsonify
from llm_vm.client import Client


UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['SECRET_KEY'] = "huh?"


@app.route('/', methods=['GET', 'POST'])
def chat():
    return render_template("chat.html")


@app.route('/llm-response', methods=['POST'])
def response():
    if request.method == 'POST':
        client = Client(big_model='chat_gpt')
        try:
            response = client.complete(
                prompt=request.form["prompt"],
                context='',
                openai_key=request.form["openai_key"]
            )
            print(response)
            if response == "[object Object]":
                raise Exception(
                    "Connection Error. Did you put in a valid openai key?")
            return jsonify(
                {"response": response["completion"]}
            )
        except Exception as e:
            print(e)
            return jsonify({"response": "Error! There has been an issue with our response. Maybe there is an issue with your openai key?"})
