use actix::Message;
use rusqlite::Error;

#[derive(Deserialize)]
pub struct AddNoteRequest {
    pub title: String,
    pub contents: String,
}

#[derive(Serialize)]
pub struct AddNoteResponse {
    pub id: i64,
    pub created: i64,
}

impl Message for AddNoteRequest {
    type Result = Result<AddNoteResponse, Error>;
}
