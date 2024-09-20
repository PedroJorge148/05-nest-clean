# resource "aws_ecr_repository" "nest-clean" {
#   name = "nest-clean"
#   image_tag_mutability = "MUTABLE"

#   image_scanning_configuration {
#     scan_on_push = true
#   }

#   tags = {
#     Iac = "True"
#   }
# }