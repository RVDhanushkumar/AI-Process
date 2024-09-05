from flask import Flask, render_template, request
from g4f.client import Client

app = Flask(__name__)

# Initialize the client object
client = Client()
@app.route('/add_to_db', methods=['POST'])


# Function to get a response from the GPT-3.5-turbo model
def get_response(user_input):
    chat_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": user_input}],
    )
    return chat_completion.choices[0].message.content

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        project_name = request.form.get('project_name')
        project_description = request.form.get('project_description')
        user_input = f"Project Name: {project_name}\nProject Description: {project_description}"
        temp=" in 2 lines short and crisp"
        # Generate responses
        cost = user_input + " Estimate the cost value for completing the above project, explained in just 2 lines only in english "
        time = user_input + " Estimate the amount of time required to complete the project in value only in english . just estimated time"+temp
        person = user_input + " Estimate the manpower required to complete the project in value only in english just one word count"+temp
        depts=user_input+"tell all the indian government departments which will be involved for this project just only the departments "
        
        response = get_response(cost)
        response2 = get_response(time)
        response3 = get_response(person)
        response4=get_response(depts)
        
        return render_template('response.html', response=response, response2=response2, response3=response3,response4=response4)
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
