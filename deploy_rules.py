import json
import requests
from google.oauth2 import service_account
import google.auth.transport.requests

def deploy_rules():
    creds = service_account.Credentials.from_service_account_file(
        r"c:\Users\Aryan\Downloads\riskshield-ai-674ab-firebase-adminsdk-fbsvc-b06d82e4d8.json",
        scopes=["https://www.googleapis.com/auth/firebase", "https://www.googleapis.com/auth/cloud-platform"]
    )
    request = google.auth.transport.requests.Request()
    creds.refresh(request)
    token = creds.token

    with open("firestore.rules", "r") as f:
        rules = f.read()

    print("Creating ruleset...")
    ruleset_payload = {
        "source": {
            "files": [{"name": "firestore.rules", "content": rules}]
        }
    }
    resp = requests.post(
        "https://firebaserules.googleapis.com/v1/projects/riskshield-ai-674ab/rulesets",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json=ruleset_payload
    )
    if not resp.ok:
        print("Error creating ruleset:", resp.text)
        return
    ruleset_name = resp.json()["name"]
    print("Created ruleset:", ruleset_name)

    print("Updating release...")
    release_payload = {
        "release": {
            "name": "projects/riskshield-ai-674ab/releases/cloud.firestore",
            "rulesetName": ruleset_name
        }
    }
    resp2 = requests.patch(
        "https://firebaserules.googleapis.com/v1/projects/riskshield-ai-674ab/releases/cloud.firestore",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json=release_payload
    )
    if not resp2.ok:
        print("Error updating release:", resp2.text)
        return
    print("Rules updated successfully!")

if __name__ == "__main__":
    deploy_rules()
