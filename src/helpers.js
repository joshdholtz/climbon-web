export function makeValue(self, key) {
  return self.state[key]
}

export function makeOnChange(self, key) {
  return (event) => {
    self.setState({[key]: event.target.value})
  }
}
