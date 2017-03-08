require 'aws-sdk'
require 'dotenv'

require 'digest/md5'
require 'mime/types'

## These are some constants to keep track of my S3 credentials and
## bucket name. Nothing fancy here.

Dotenv.load

AWS_ACCESS_KEY_ID = ENV['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = ENV['AWS_SECRET_ACCESS_KEY']
AWS_S3_BUCKET = ENV['AWS_S3_BUCKET']
AWS_REGION = ENV['AWS_REGION']

puts "ENV: #{ENV['AWS_S3_BUCKET']}"

namespace :build do
  puts "== Building production assets"
  `npm run build`
end

## This defines the rake task `assets:deploy`.
namespace :assets do
  desc "Deploy all assets in public/**/* to S3/Cloudfront"
  task :deploy, :env, :branch do |t, args|

    ## Build assets
    Rake::Task[:build].execute

    ## Use the `s3` gem to connect my bucket
    puts "== Uploading assets to S3/Cloudfront"

    Aws.config.update({
      region: AWS_REGION,
      credentials: Aws::Credentials.new(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
    })

    s3_client = Aws::S3::Client.new

    bucket = Aws::S3::Bucket.new(AWS_S3_BUCKET, client: s3_client)
    bucket.clear!

    ## Needed to show progress
    STDOUT.sync = true

    ## Find all files (recursively) in ./build and process them.
    Dir.glob("build/**/*").each do |file|

      ## Only upload files, we're not interested in directories
      if File.file?(file)

        ## Slash 'build/' from the filename for use on S3
        remote_file = file.gsub("build/", "")

        ## Try to find the remote_file, an error is thrown when no
        ## such file can be found, that's okay.
        # begin
        #   obj = bucket.objects.find_first(remote_file)
        # rescue
        #   obj = nil
        # end

        ## If the object does not exist, or if the MD5 Hash / etag of the
        ## file has changed, upload it.
        # if !obj || (obj.etag != Digest::MD5.hexdigest(File.read(file)))
            print "U"

            ## Simply create a new object, write the content and set the proper
            ## mime-type. `obj.save` will upload and store the file to S3.
            obj = bucket.put_object({
              acl: 'public-read',
              key: remote_file,
              body: File.open(file, 'rb')
              # content_type: MIME::Types.type_for(file).to_s
            })
            # obj = bucket.objects.build(remote_file)
            # obj.content = open(file)
            # obj.content_type = MIME::Types.type_for(file).to_s
            # obj.save
        # else
        #   print "."
        # end
      end
    end
    STDOUT.sync = false # Done with progress output.

    puts
    puts "== Done syncing assets"
    puts "Public Bucket URL: http://#{AWS_S3_BUCKET}.s3-website-#{AWS_REGION}.amazonaws.com"
  end
end
