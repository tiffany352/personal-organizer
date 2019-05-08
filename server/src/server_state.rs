use crate::database;
use actix::prelude::*;

pub struct State {
    pub db: Addr<database::DbExecutor>,
}
