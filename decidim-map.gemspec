# frozen_string_literal: true

$LOAD_PATH.push File.expand_path("lib", __dir__)

require "decidim/map/version"

Gem::Specification.new do |s|
  s.version = Decidim::Map.version
  s.authors = ["moustachu"]
  s.email = ["moustachu@opensourcepolitics.eu"]
  s.license = "AGPL-3.0"
  s.homepage = "https://github.com/decidim/decidim-module-map"
  s.required_ruby_version = ">= 2.3.1"

  s.name = "decidim-map"
  s.summary = "A decidim map module"
  s.description = "#Carto."

  s.files = Dir["{app,config,lib}/**/*", "LICENSE-AGPLv3.txt", "Rakefile", "README.md"]

  s.add_dependency "decidim-admin", Decidim::Map.version
  s.add_dependency "decidim-core", Decidim::Map.version
  s.add_dependency "decidim-api", Decidim::Map.version

  s.add_development_dependency "decidim-dev", Decidim::Map.version
end
