import React, { useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form } from 'react-bootstrap'
import './Column.scss'

import Card from 'components/Card/Card'
import ConfirmModal from 'components/common/ConfirmModal'
import { mapOrder } from 'utilities/sorts'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { saveContentAfterEnter, selectAllInlineText } from 'utilities/contentEditable'

function Column(props) {
    const { column, onCardDrop, onUpdateColumn } = props
    const cards = mapOrder(column.cards, column.cardOrder, 'id')

    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

    const onConfirmModalAction = (type) => {
        if (type === MODAL_ACTION_CONFIRM) {
            const newColumn = {
                ...column,
                _destroy: true
            }
            onUpdateColumn(newColumn)
        }
        toggleShowConfirmModal()
    }

    const [columnTitle, setColumnTile] = useState('')

    useEffect(() => {
        setColumnTile(column.title)
    }, [column.title])

    const handleColumnTitleChange = (e) => {
        setColumnTile(e.target.value)
    }

    const handleColumnTitleBlur = () => {
        const newColumn = {
            ...column,
            title: columnTitle
        }
        onUpdateColumn(newColumn)
    }

    return (
        <div className="column">
            <header className='column-drag-handle'>
                <div className="column-title">
                    <Form.Control
                        size="sm"
                        type="text"
                        className="trello-content-editable"
                        value={columnTitle}
                        spellCheck="false"
                        onClick={selectAllInlineText}
                        onChange={handleColumnTitleChange}
                        onKeyDown={saveContentAfterEnter}
                        onBlur={handleColumnTitleBlur}
                        onMouseDown={e => e.preventDefault()}
                    />
                </div>
                <div className="column-dropdown-actions">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn"></Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>Add Cart</Dropdown.Item>
                            <Dropdown.Item onClick={toggleShowConfirmModal}>Remove Column</Dropdown.Item>
                            <Dropdown.Item>Move all cart in this column (beta)...</Dropdown.Item>
                            <Dropdown.Item>Active all cart in this column (beta)...</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
            <div className="card-list">
                <Container
                    groupName="col"
                    onDrop={dropResult => onCardDrop(column.id, dropResult)}
                    getChildPayload={index => cards[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview'
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) => (
                        <Draggable key={index}>
                            <Card card={card} />
                        </Draggable>
                    ))}
                </Container>
            </div>
            <footer>
                <div className="footer-actions">
                    <i className="icon fa fa-plus" />
                    Add another card
                </div>
            </footer>
            <ConfirmModal
                title="Remove Column"
                content={`Are you sure you want to remove <strong>${column.title} !</strong></br> All related card will also be removed`}
                show={showConfirmModal}
                onAction={onConfirmModalAction} />
        </div >
    )
}

export default Column