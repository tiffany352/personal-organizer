use crate::model::AddNoteRequest;
use crate::server_state::State;
use actix_web::{AsyncResponder, Error, HttpMessage, HttpRequest, HttpResponse};
use futures::Future;

pub fn add_note(request: &HttpRequest<State>) -> Box<Future<Item = HttpResponse, Error = Error>> {
    let db = request.state().db.clone();

    request
        .json::<AddNoteRequest>()
        .from_err()
        .and_then(move |params| {
            db.send(params).from_err().and_then(|res| match res {
                Ok(result) => Ok(HttpResponse::Ok().json(result)),
                Err(_) => Ok(HttpResponse::InternalServerError().into()),
            })
        })
        .responder()
}
