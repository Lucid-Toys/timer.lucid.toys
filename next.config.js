module.exports = {
  async redirects() {
    return [
      {
        source: "/:minutes",
        destination: "/?m=:minutes&running=true",
        permanent: false,
      },
      {
        source: "/:hours/:minutes/:seconds",
        destination: "/?h=:hours&m=:minutes&s=:seconds&running=true",
        permanent: false,
      },
    ]
  },
}
