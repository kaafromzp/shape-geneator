import { ISegment } from 'types/index';

export function save ( link: HTMLAnchorElement, blob: Blob, filename: string ) {

  link.href = URL.createObjectURL( blob );
  link.download = filename;
  link.click();

}

export function saveString ( link: HTMLAnchorElement, text: string, filename: string ) {

  save(
    link,
    new Blob( [text], { type: 'text/plain' } ),
    filename );

}

export function saveArrayBuffer ( link: HTMLAnchorElement, buffer: ArrayBuffer, filename: string ) {

  save(
    link,
    new Blob( [buffer], { type: 'application/octet-stream' } ),
    filename );

}

export const exportCode = ( segments: ISegment[] ) => (
  `const path = new THREE.Path();

${ segments.map( ( s, i ) => {
    switch ( s.type ) {
      case 'move':
        return `path.moveTo(${ s.to.x },${ s.to.y })`;
      case 'linear':
        return `path.lineTo(${ s.to.x },${ s.to.y })`;
      case 'arc':
        return `path.absarc(${ s.center.x },${ s.center.y },${ s.radius },${ s.angleFrom },${ s.angleTo },${ s.clockwise })`;
      case 'qBezier':
        return `path.quadraticCurveTo(${ s.helperPoint1.x },${ s.helperPoint1.y },${ s.to.x },${ s.to.y })`;
      default: return '';
    }
  } ).join( '\n' ) }

const points = path.getPoints();

const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xffffff } );

const line = new THREE.Line( geometry, material );
scene.add( line );`
);
