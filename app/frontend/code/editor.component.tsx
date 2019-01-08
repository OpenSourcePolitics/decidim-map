import * as React from 'react';

import { TopBar, Button, Colors, Sizes } from 'react-foundation';
import * as utils from './utils';
import { FaIcon } from '../application/icon.component';
import ResizableWrapper from '../application/resizable.component';

// CodeMirror (code display)
import {
  Controlled as CodeMirror,
  IInstance as CodeMirrorIInstance
} from 'react-codemirror2';
import { EditorChange as CodeMirrorChange } from 'codemirror';
require('codemirror/mode/javascript/javascript');
import 'codemirror/lib/codemirror.css';

import { Map, TileLayer, ZoomControl, GeoJSON } from 'react-leaflet';
import bbox from '@turf/bbox';
import * as geojsonhint from '@mapbox/geojsonhint';

// Prettier (code formatter)
const prettier = require('prettier/standalone');
const prettierBabylon = require('prettier/parser-babylon');
const prettierTS = require('prettier/parser-typescript');

const { I18n } = require('react-i18nify');

export interface EditorProps {
  for: string;
  value?: string;
  mode?: string;
}

interface EditorState {
  value: string;
  options: object;
  showPreview: boolean;
}

export class Editor extends React.Component<EditorProps, EditorState> {
  public editor: CodeMirrorIInstance;
  public viewport: ResizableWrapper;
  public preview: Map;

  constructor(props: EditorProps) {
    super(props);
    this.state = {
      value: prettier.format((props.value || ''),{
        parser: 'json',
        plugins: [prettierBabylon]
      }),
      options : {
        mode: props.mode || 'javascript'
      },
      showPreview: false
    };
  }

  public componentDidMount() {
    this.editor.setSize(null,'12rem');
  }

  public componentDidUpdate() {
    if(this.viewport) {
      if(this.state.showPreview){
        this.viewport.updateSize(this.preview.container.clientHeight);
      } else {
        this.editor.setSize(null,this.viewport.state.height);
      }
    }
  }

  public isValidJSON = () => {
    try {
        JSON.parse(this.state.value);
    } catch (e) {
        return false;
    }
    return true;
  }

  public isValidGeoJSON = () => {
    return this.isValidJSON() && geojsonhint.hint().length;
  }

  public getBounds = (): Array<[number, number]> => {
    let bounds = bbox(JSON.parse(this.state.value));
    return [[
      bounds[1], // minY
      bounds[0]  // minX
    ],[
      bounds[3], // maxY
      bounds[2]  // maxX
    ]]
  }

  public handleChange = (editor: CodeMirrorIInstance, data: CodeMirrorChange, value: string) => {
    if(this.isValidGeoJSON()) {
      window.$('#' + this.props.for).val(utils.compressJSON(value));
    }
  }

  public handlePreview = (e: any) => {
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview
    });
  }

  public textData = () => {
    utils.textData(this.state.value)
  }

  public render(): JSX.Element {
    let { options, value, showPreview } = this.state;
    let isValid = this.isValidGeoJSON();
    let data = utils.textData(value);
    return (
      <div>
        <ResizableWrapper
          ref={(viewport: any) => { this.viewport = viewport }}
          minHeight={ showPreview ? 300 : 50 }
          onResize={(height) => {
            this.editor.setSize(null,height);
          }}>
          {(isValid && showPreview) ? (
            <Map className='ce-preview'
              ref={(preview: any) => { this.preview = preview }}
              bounds={this.getBounds()}
              zoomControl={false}
              maxZoom={20}>
              <TileLayer
                attribution='Carto/OSM - CC BY 3.0.'
                url={'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'}
              />
              <ZoomControl position='topleft' />
              <GeoJSON data={JSON.parse(value)}/>
            </Map>
          ):(
            <CodeMirror className='ce-editor'
              value={value}
              options={options}
              onBeforeChange={(editor, data, value) => {
                this.setState({value});
              }}
              onChange={this.handleChange}
              editorDidMount={(editor: CodeMirrorIInstance) => {
                this.editor = editor
              }}
            />
          )}
        </ResizableWrapper>
        <div className='ce-footer clearfix'>
          {isValid && (
            <Button size={Sizes.TINY} isHollow
              color={Colors.PRIMARY}
              title={I18n.t('decidim.code.editor.actions.preview')}
              onClick={this.handlePreview}>
              <FaIcon name={showPreview ? 'code' : 'image'}/>
            </Button>
          )}
          <span className='float-right'>{data.size}</span>
        </div>
      </div>
    )
  }
}

export default Editor;
