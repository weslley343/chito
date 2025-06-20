# Run the hexagonRecSys setup
echo "Seting up RecSys..."



cd hexagonRecSys-main/ || { echo "open recsys_setup failed"; exit 1; }

python3 -m venv .venv || { echo "venv recsys_setup failed"; exit 1; }

source .venv/bin/activate || { echo "activate venv recsys_setup failed"; exit 1; }

fastapi dev main.py || { echo "fastapi dev recsys_setup failed"; exit 1; }
