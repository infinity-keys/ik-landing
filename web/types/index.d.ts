declare namespace cloudinary {
  /**
   * Creates a widget object and frame in memory,
   * but does not display it until the open() method of
   * the returned widget object is called.
   */
  function createUploadWidget<T extends CloudinaryEvent>(
    uploadConfig: UploadInterface,
    cb: (error: string, result: Event<T>) => void
  ): WidgetInterface

  /**
   * Creates a widget object and frame in memory, and also opens the widget
   */
  function openUploadWidget<T extends CloudinaryEvent>(
    uploadConfig: UploadInterface,
    cb: (error: string, result: Event<T>) => void
  ): WidgetInterface

  /**
   * Creates a widget object and frame in memory, and also modifies a
   * given element to a blue button (customizable look & feel) that,
   *  when clicked, opens a pre-created upload widget. In addition,
   * the form and thumbnails options are implicitly set by default
   * to the containing form of the given element.
   */
  function applyUploadWidget<T extends CloudinaryEvent>(
    element: HTMLElement,
    uploadConfig: UploadInterface,
    cb: (error: string, result: Event<T>) => void
  ): WidgetInterface

  /**
   * Globally sets the cloud name for all widget method calls.
   */
  function setCloudName(name: string): void

  interface WidgetInterface {
    /**
     * Renders an existing widget currently in memory,
     * but that is not currently displayed.
     */
    open(url?: string): void

    /**
     * Closes the widget and removes it from memory.
     */
    close(quiet?: boolean): void
    /**
     * Updates a widget currently in memory with new options
     */
    update(updateConfig: UploadInterface): void

    /**
     * Hides a previously rendered widget without removing it from memory.
     */
    hide(): void

    /**
     * Renders a previously hidden widget.
     */
    show(): void

    /**
     * Minimizes the widget.
     */
    minimize(): void

    /**
     * Returns whether the widget is currently visible.
     */
    isShowing(): boolean

    /**
     * Returns whether the widget is currently minimized.
     */
    isMinimized(): boolean
  }

  interface UploadInterface {
    /**
     * Your Cloudinary account cloud name.
     * Can be set either globally using setCloudName
     * or explicitly for each widget creation call.
     */
    cloudName: string

    /**
     * The name of an upload preset defined for your Cloudinary account.
     * If using the upload widget for unsigned uploads,
     * make sure you specify an unsigned upload preset, and conversely,
     * if you choose to provide an upload preset for a widget performing signed uploads,
     * make sure you provide a signed upload preset.
     * You can define upload presets either on the Upload tab of the console settings or
     * by using the Admin API.
     *
     */
    uploadPreset: string

    /**
     * Allows client-side validation of the uploaded files based on their file extensions.
     *  You can specify one or more file extensions. ex. ['png', 'gif', 'jpeg']
     */
    clientAllowedFormats?: string[]

    /**
     * If specified, perform client-side validation to prevent uploading files larger
     * than the given bytes size.
     */
    maxFileSize?: number

    /**
     * If specified, perform client-side validation to prevent
     * uploading image files larger
     * than the given bytes size.
     */
    maxImageFileSize?: number

    /**
     * The name of a predefined widget theme.
     * Widget behavior is the same for all themes.
     *
     */
    theme?: 'default' | 'white' | 'minimal' | 'purple'

    /**
     * Enables you to override the default caption of
     * the upload button added to your site.
     *
     */
    buttonCaption?: string

    /**
     * Enables you to override the default CSS class name of
     * the upload button added to your site.
     * The default CSS style is applied to the cloudinary-button class
     *
     */
    buttonClass?: string

    folder?: string
    cropping?: boolean

    /**
     * Defines the source options to add to the upload widget,
     * where each source defines a new upload tab or source option within the widget.
     *
     */
    sources?: Sources[]

    googleApiKey?: string
    /**
     * The domain names of sites you want to allow for the search
     *
     */
    searchBySites?: Array<'all' | string>

    /**
     * Set to true to add a dropdown box so that users can select
     * a licensing filter to apply to the image search
     *
     */
    searchByRights?: boolean

    /**
     *  The App ID of your own application for accessing your users Instagram accounts
     *
     */
    instagramClientId?: string

    /**
     * The Client ID of your own Google Drive application for accessing your users'
     *  Google Drive accounts
     *
     */
    googleDriveClientId?: string

    /**
     * Files can be encrypted and then uploaded to Cloudinary as raw files.
     * These files cannot be previewed within Cloudinary and will need
     *  to be decrypted after downloading them
     */
    encryption?: {
      key: string
      /** initialization vector */
      iv: string
    }

    styles?: {
      palette: Record<string, string>
      fonts: object
    }

    /**
     * tagging suggestions that appear while your users are typing in the Add a Tag
     *
     */
    getTags?: (cb: (tags: string[]) => void, prefix: string) => string[]

    language?: string

    text?: Record<string, Record<string, string>>
    /**
     * 	Whether the Upload More button will be displayed after the upload completes.
     */
    showUploadMoreButton?: boolean
  }

  interface Event<T extends CloudinaryEvent> {
    data?: {
      event: T
      info: CloudinaryEventInfoMap[T]
      type: string
      widgetId: string
    }
    event: T
    info: CloudinaryEventInfoMap[T]
  }

  type CloudinaryEvent =
    | 'abort'
    | 'batch-cancelled'
    | 'close'
    | 'display-changed'
    | 'publicid'
    | 'queues-end'
    | 'queues-start'
    | 'retry'
    | 'show-completed'
    | 'source-changed'
    | 'success'
    | 'tags'
    | 'upload-added'

  type CloudinaryEventInfoMap = {
    abort: {
      ids: []
      all: true | false
    }
    'batch-cancelled': {
      reason: 'MAX_EXCEEDED' | 'INVALID_PUBLIC_ID'
    }
    close: { message: string }
    'display-changed': 'shown' | 'hidden' | 'minimized' | 'expanded'
    publicid: { id: 'my-public-id' }
    'queues-end': {
      files: CFile[]
    }
    'queues-start': never
    retry: {
      ids: []
      /** whether retry-all was clicked */
      all: true | false
    }
    'show-completed': {
      items: Array<{
        id: string
        name: string
        size: number
        type: string
        status: string
        done: boolean
        progress: number
        file: File
        uploadInfo: UploadInfo
      }>
    }
    'source-changed': {
      source: Sources[]
    }
    success: UploadInfo & {
      id: string
      batchId: string
    }
    tags: { tags: string[] }
    'upload-added': {
      file: File
      publicId: string
    }
  }

  type Sources =
    | 'local'
    | 'url'
    | 'facebook'
    | 'dropbox'
    | 'image_search'
    | 'camera'
    | 'instagram'
    | 'shutterstock'
    | 'google_drive'

  interface CFile {
    aborted: boolean
    batchId: string
    camera: boolean
    coordinatesResize: boolean
    delayedPreCalls: boolean
    dimensions: [number, number]
    done: true
    failed: boolean
    id: string
    imageDimensions: []
    name: string
    partOfBatch: boolean
    paused: boolean
    preparedParams: {}
    progress: number
    publicId: string
    publicIdCounter: number
    size: number
    status: CloudinaryEvent
    statusText: CloudinaryEvent
    type: string
    uploadInfo: UploadInfo
  }

  interface UploadInfo {
    asset_id: string
    bytes: number
    created_at: string
    etag: string
    format: string
    height: number
    original_filename: string
    path: string
    placeholder: boolean
    public_id: string
    resource_type: string
    secure_url: string
    signature: string
    tags: string[]
    thumbnail_url: string
    type: string
    url: string
    version: number
    version_id: string
    width: number
  }
}
