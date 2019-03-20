create table notes (
    created integer not null,
    updated integer,
    deleted integer,
    title text not null,
    contents text not null
);

create table note_tags (
    noteid integer not null references `notes.rowid`,
    tagid integer not null references `tags.rowid`,

    primary key ( noteid, tagid )
);
