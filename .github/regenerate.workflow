workflow "Regenerate FDF README" {
  on = "push"
  resolves = ["Runs Script"]
}

action "Runs Script" {
  uses = "actions/setup-node@e565252a9dec30354d1b3507ab733e40b9580cc9"
  runs = "npm"
  args = "run gen"
}
