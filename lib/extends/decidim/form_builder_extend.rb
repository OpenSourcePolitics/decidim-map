# frozen_string_literal: true

Decidim::FormBuilder.class_eval do
  def code_editor(attribute, options = {})
    content_tag(:div, class: "code-editor #{options[:class]}") do
      template = ""
      template += label(attribute, (options[:label] || label_for(attribute)) + required_for_attribute(attribute)) unless options[:label] == false
      template += hidden_field(attribute)
      template += content_tag(:div, nil, class: "code-editor-container", data: {
        for: "#{object_name}_#{attribute}",
        plugin: "editor"
      })
      template += error_for(attribute, options) if error?(attribute)
      template.html_safe
    end

  end
end