resource "aws_iam_openid_connect_provider" "oidc-git" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com"
  ]

  thumbprint_list = [
    "1b511abead59c6ce207077c0bf0e0043b1382612"
  ]

  tags = {
    Iac = "True"
  }
}

resource "aws_iam_role" "ecr-role" {
  name = "ecr-role"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  assume_role_policy = jsonencode({
    Version : "2012-10-17",
    Statement : [
      {
        Effect : "Allow",
        Action : "sts:AssumeRoleWithWebIdentity",
        Principal : {
          Federated : "arn:aws:iam::327649228912:oidc-provider/token.actions.githubusercontent.com"
        },
        Condition : {
          StringEquals : {
            "token.actions.githubusercontent.com:aud" : [
              "sts.amazonaws.com"
            ],
            "token.actions.githubusercontent.com:sub" : [
              "repo:pedrojorge148/05-nest-clean:ref:refs/heads/main"
            ]
          }
        }
      }
    ]
  })

  # inline_policy {
  #   name = "ecr-app-permission"

  #   policy = jsonencode({
  #     Version : "2012-10-17",
  #     Statement : [
  #       {
  #         Sid : "Statement1"
  #         Action : [
  #           "ecr:GetDownloadUrlForLayer",
  #           "ecr:BatchGetImage",
  #           "ecr:BatchCheckLayerAvailability",
  #           "ecr:PutImage",
  #           "ecr:InitiateLayerUpload",
  #           "ecr:UploadLayerPart",
  #           "ecr:CompleteLayerUpload",
  #           "ecr:GetAuthorizationToken",
  #         ],
  #         Effect : "Allow",
  #         Resource : "*"
  #       }
  #     ]
  #   })
  # }

  tags = {
    Iac = "True"
  }

  depends_on = [ aws_iam_openid_connect_provider.oidc-git ]
}