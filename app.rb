require 'json'

require 'sinatra/base'
require 'sinatra/assetpack'
require 'sinatra/jstpages'
require 'sinatra/config_file'

require 'twilio-ruby'

class App < Sinatra::Base
  set :root, File.dirname(__FILE__)
  set :views, Proc.new { File.join(root, "app", "views") }

  register Sinatra::AssetPack
  register Sinatra::JstPages
  register Sinatra::ConfigFile

  serve_jst '/jst.js'
  config_file 'config.yml'

  assets {
    serve '/js',     from: 'app/js'
    serve '/css',    from: 'app/css'
    serve '/images', from: 'app/images'

    js :app, '/js/app.js', [
      '/js/libs/jquery-2.1.1.min.js',
      '/js/libs/underscore-min.js',
      '/js/libs/backbone-min.js',
      '/js/libs/bootstrap.min.js',
      '/jst.js',
      '/js/application.js',
      '/js/backbone/*.js',
      '/js/backbone/*/**.js',
      '/js/components/*.js'
    ]

    css :app, '/css/app.css', [
      '/css/bootstrap.min.css',
      '/css/font-awesome.min.css',
      '/css/application.css'
    ]

    js_compression  :jsmin
    css_compression :simple
  }

  get '/' do
    account_sid = settings.twilio_account_sid
    auth_token = settings.twilio_auth_token
    demo_app_sid = settings.twilio_app_sid
    client_name = params[:client]
    if client_name.nil?
        client_name = settings.twilio_client_name
    end

    capability = Twilio::Util::Capability.new account_sid, auth_token
    capability.allow_client_outgoing demo_app_sid
    capability.allow_client_incoming client_name
    token = capability.generate

    erb :layout, :locals => {:token => token, :client_name => client_name}
  end

  get '/phones.json' do
    content_type 'application/json'
    File.read(File.join(settings.root, 'data', 'phones.json'))
  end

  post '/voice' do
    number = params[:phone_number]
    response = Twilio::TwiML::Response.new do |r|
      r.Dial :callerId => settings.twilio_caller_id do |d|
        if /^[\d\+\-\(\) ]+$/.match(number)
          d.Number(CGI::escapeHTML number)
        else
          d.Client number
        end
      end
    end
    response.text
  end

end
