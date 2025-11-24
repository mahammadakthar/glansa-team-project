import sqlite3

DB_NAME = "resume_app.db"

# -----------------------------
# 1) Connect to the SQLite DB
# -----------------------------
def get_db():
    conn = sqlite3.connect(DB_NAME)
    return conn


# -----------------------------------------
# 2) Create required tables (run once only)
# -----------------------------------------
def setup_db():
    db = get_db()
    
    # Users table (for login)
    db.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            password TEXT
        );
    """)
    
    # History table (resume + generated questions)
    db.execute("""
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            resume_text TEXT,
            questions TEXT,
            created_at TEXT
        );
    """)

    db.commit()
    db.close()


# -----------------------------
# 3) Save generated questions
# -----------------------------
def save_history(user_id, resume_text, questions):
    db = get_db()
    db.execute(
        "INSERT INTO history (user_id, resume_text, questions, created_at) VALUES (?, ?, ?, datetime('now'))",
        (user_id, resume_text, questions)
    )
    db.commit()
    db.close()
    return True


# -----------------------------
# 4) Fetch previous history
# -----------------------------
def get_history(user_id):
    db = get_db()
    rows = db.execute(
        "SELECT * FROM history WHERE user_id=? ORDER BY id DESC",
        (user_id,)
    ).fetchall()
    db.close()
    return rows
