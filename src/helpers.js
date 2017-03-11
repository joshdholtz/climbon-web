export function makeValueLink(self, key) {
  return {
    value: self.state[key],
    requestChange: (newValue) => {
      self.setState({[key]: newValue})
    }
  }
}
