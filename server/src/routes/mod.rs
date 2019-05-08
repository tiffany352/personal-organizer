use crate::server_state::State;
use actix_web::{http::Method, App};

pub mod notes;

pub fn configure(app: App<State>) -> App<State> {
    app.resource("/notes/add", |r| {
        r.method(Method::PUT).f(notes::add_note::add_note)
    })
}
