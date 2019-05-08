extern crate actix_web;
#[macro_use]
extern crate serde_derive;
extern crate rusqlite;

use actix::prelude::*;
use actix_web::{server, App};

mod database;
mod model;
mod routes;
mod server_state;

fn main() {
    let sys = actix::System::new("personal-organizer-server");

    let addr = SyncArbiter::start(3, || database::DbExecutor::new());

    server::new(move || {
        routes::configure(App::with_state(server_state::State { db: addr.clone() }).prefix("/api"))
    })
    .bind("127.0.0.1:3001")
    .unwrap()
    .run();

    let _ = sys.run();
}
