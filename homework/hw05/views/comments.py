import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.comment import Comment
from views import get_authorized_user_ids


class CommentListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def post(self):
        # TODO: Add POST logic...

        data = request.json
        print(data)
        # post_id = data.get("post_id")
        text = data.get("text")

        try:
            post_id = int(data.get("post_id"))
            if not post_id:
               return Response(json.dumps({"message": "Post id is a required parameter"}), mimetype="application/json", status=400)
        except:
                return Response(json.dumps({"message": "The post id must be an integer"}), mimetype="application/json", status=400)


        postID = Comment.query.get(data.get("post_id"))
        if postID is None:
            return Response(
                json.dumps({"Message": f"Post id={id} not found"}),
                mimetype="application/json",
                status=404,
            )
        


        # if post_id in get_authorized_user_ids(self.current_user):
        #     pass
        # else:
        #     return Response(
        #         json.dumps({"Message": f"You do not have access to Post id={id}"}),
        #         mimetype="application/json",
        #         status=404,
        #     )
    
        if not text:
            return Response(json.dumps({"message": "text is a required parameter"}), mimetype="application/json", status=400)

        new_comment = Comment(
            post_id=post_id,
            text=text,
            user_id=self.current_user.id
        )

        db.session.add(new_comment)
        db.session.commit() 
        return Response(
            json.dumps(new_comment.to_dict()),
            mimetype="application/json",
            status=201,
        )


class CommentDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        # TODO: Add DELETE logic...
        print(id)

        return Response(
            json.dumps({}),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        CommentListEndpoint,
        "/api/comments",
        "/api/comments/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        CommentDetailEndpoint,
        "/api/comments/<int:id>",
        "/api/comments/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
