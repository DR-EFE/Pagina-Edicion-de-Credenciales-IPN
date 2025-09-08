import React, { useState, useRef, ChangeEvent } from 'react';
import domtoimage from 'dom-to-image-more';
import './App.css';
import credentialBackground from './assets/IMAGEN DE FONDO.jpeg';

function App() {
    const [name, setName] = useState('');
    const [boleta, setBoleta] = useState('');
    const [program, setProgram] = useState('INGENIERÍA EN INFORMATICA');
    const [customProgram, setCustomProgram] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const credentialRef = useRef<HTMLDivElement>(null);
    const photoUploadRef = useRef<HTMLInputElement>(null);

    const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // Corregido para validar 5MB correctamente
                alert('⚠️ La imagen es demasiado grande. Por favor, selecciona una imagen menor a 5MB.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                setPhoto(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProgramChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'other') {
            setProgram('');
        } else {
            setProgram(value);
        }
    };
    
    const handleDownload = async () => {
        if (!name || !boleta) {
            alert('⚠️ Por favor, completa al menos el nombre y número de boleta antes de descargar.');
            return;
        }
        if (boleta.length < 6) {
            alert('⚠️ El número de boleta debe tener al menos 6 dígitos.');
            return;
        }

        const credentialNode = credentialRef.current;
        if (credentialNode) {
            setLoading(true);
            try {
                const scale = 3; // Aumentamos la escala para mayor resolución
                const dataUrl = await domtoimage.toPng(credentialNode, {
                    width: credentialNode.offsetWidth * scale,
                    height: credentialNode.offsetHeight * scale,
                    style: {
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        width: `${credentialNode.offsetWidth}px`,
                        height: `${credentialNode.offsetHeight}px`
                    }
                });

                const link = document.createElement('a');
                const fileName = `Credencial_${name.replace(/\s+/g, '_')}_${boleta}.png`;
                link.download = fileName;
                link.href = dataUrl;
                link.click();
                alert('✅ ¡Credencial descargada exitosamente!');
            } catch (error) {
                console.error('❌ Error al generar la credencial:', error);
                alert('❌ Error al generar la credencial. Por favor, intenta nuevamente.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleReset = () => {
        setName('');
        setBoleta('');
        setProgram('INGENIERÍA EN SISTEMAS COMPUTACIONALES');
        setCustomProgram('');
        setPhoto(null);
        if(photoUploadRef.current) {
            photoUploadRef.current.value = '';
        }
    };

    return (
        <div className="container">
            {loading && (
                <div className="loading" style={{ display: 'flex' }}>
                    <div className="loading-content">
                        <div className="spinner"></div>
                        <p>Generando credencial...</p>
                    </div>
                </div>
            )}

            <div className="control-panel">
                <h2>📝 Editor de Credencial</h2>
                
                <div className="form-group">
                    <label htmlFor="photoUpload">📸 Foto del Estudiante</label>
                    <div className="file-input-wrapper">
                        <input type="file" id="photoUpload" className="file-input" accept="image/*" onChange={handlePhotoUpload} ref={photoUploadRef} />
                        <button type="button" className="file-input-button" onClick={() => photoUploadRef.current?.click()}>
                            Subir Fotografía
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="nameInput">👤 Nombre Completo</label>
                    <input type="text" id="nameInput" placeholder="APELLIDOS NOMBRE" value={name} onChange={(e) => setName(e.target.value.toUpperCase())} />
                </div>

                <div className="form-group">
                    <label htmlFor="boletaInput">🔢 Número de Boleta</label>
                    <input type="text" id="boletaInput" placeholder="2022601075" maxLength={15} value={boleta} onChange={(e) => setBoleta(e.target.value.replace(/[^0-9]/g, ''))} />
                </div>

                <div className="form-group">
                    <label htmlFor="programSelect">📚 Programa Académico</label>
                    <select id="programSelect" value={program || 'other'} onChange={handleProgramChange}>
                        <option value="INGENIERÍA EN INFORMÁTICA">INGENIERÍA EN INFORMÁTICA</option>
                        <option value="INGENIERÍA INDUSTRIAL">INGENIERÍA INDUSTRIAL</option>
                        <option value="INGENIERÍA EN SISTEMAS COMPUTACIONALES">INGENIERÍA EN SISTEMAS COMPUTACIONALES</option>
                        <option value="LICENCIATURA EN CIENCIAS DE LA INFORMÁTICA">LICENCIATURA EN CIENCIAS DE LA INFORMÁTICA</option>
                        <option value="INGENIERÍA EN TRANSPORTE">INGENIERÍA EN TRANSPORTE</option>
                        <option value="CONTADOR PÚBLICO">CONTADOR PÚBLICO</option>
                        <option value="LICENCIATURA EN ADMINISTRACIÓN INDUSTRIAL">LICENCIATURA EN ADMINISTRACIÓN INDUSTRIAL</option>
                        <option value="other">Otro...</option>
                    </select>
                </div>

                {program === '' && (
                    <div className="form-group">
                        <input type="text" id="customProgram" placeholder="Escribir programa personalizado..." value={customProgram} onChange={(e) => setCustomProgram(e.target.value.toUpperCase())} />
                    </div>
                )}

                <button className="btn btn-download" onClick={handleDownload}>
                    💾 Descargar Credencial
                </button>
                
                <button className="btn btn-reset" onClick={handleReset}>
                    🔄 Limpiar Campos
                </button>

                <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.85rem', color: '#666' }}>
                    <strong>💡 Instrucciones:</strong><br />
                    • Usa el panel lateral para editar los campos<br />
                    • La vista previa se actualiza en tiempo real
                </div>
            </div>

            <div className="credential-wrapper">
                <div className="credential-container" id="credentialContainer" ref={credentialRef}>
                    <img src={credentialBackground} alt="Credencial IPN" className="credential-background" />
                    
                    <div className="student-photo">
                        {photo && <img src={photo} alt="Foto del estudiante" />}
                    </div>
                    
                    <div className="editable-field field-name">{name}</div>
                    <div className="editable-field field-boleta">{boleta}</div>
                    <div className="editable-field field-program">{program === '' ? customProgram : program}</div>
                </div>
            </div>
        </div>
    );
}

export default App;