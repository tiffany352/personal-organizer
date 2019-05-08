use crate::model::*;
use actix::prelude::*;
use rusqlite::{Connection, Error};

pub struct DbExecutor {
    conn: Connection,
}

const ADD_USER_SQL: &'static str = r"
insert into notes (title, contents, created, updated)
    values (:title, :contents, :now, :now)
";

impl Actor for DbExecutor {
    type Context = SyncContext<Self>;
}

impl DbExecutor {
    pub fn new() -> DbExecutor {
        let conn = Connection::open("personal-organizer.sqlite").unwrap();
        DbExecutor { conn: conn }
    }
}

impl Handler<AddNoteRequest> for DbExecutor {
    type Result = Result<AddNoteResponse, Error>;

    fn handle(&mut self, msg: AddNoteRequest, _: &mut Self::Context) -> Self::Result {
        let now = 1234567;
        self.conn.execute_named(
            ADD_USER_SQL,
            &[
                ("title", &msg.title),
                ("contents", &msg.contents),
                ("now", &now),
            ],
        )?;
        Ok(AddNoteResponse {
            id: self.conn.last_insert_rowid(),
            created: now,
        })
    }
}
